import { useCallback, useEffect, useReducer } from "react";

type Event = "loading" | "success" | "error" | "reset";

type EventWithPayload = {
  type: Event;
  payload?: unknown;
  preserveData?: boolean;
};

type ActionState<R> = {
  loading: boolean;
  error: unknown;
  data: R | null;
  success: boolean | undefined;
};

type Options<T> = (
  | {
      immediate: true;
      args: T;
    }
  | {
      immediate: false;
    }
) & { preserveData?: boolean };

function reducer<R>(state: ActionState<R>, event: EventWithPayload): ActionState<R> {
  switch (event.type) {
    case "loading":
      return {
        data: event.preserveData ? state.data : null,
        success: undefined,
        error: false,
        loading: true,
      };
    case "success":
      return {
        success: true,
        data: event.payload as Exclude<R, { error: string }>,
        error: null,
        loading: false,
      };
    case "error":
      return {
        success: false,
        data: event.preserveData ? state.data : null,
        error: event.payload,
        loading: false,
      };
    case "reset":
      return { success: undefined, data: null, error: false, loading: false };
    default:
      return state;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAction<T extends (...args: any[]) => any>(
  action: T,
  opts?: Options<Parameters<T>>
) {
  const [actionState, dispatch] = useReducer(reducer<Awaited<ReturnType<T>>>, {
    success: undefined,
    loading: Boolean(opts?.immediate),
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
      dispatch({ type: "loading", preserveData: opts?.preserveData });
      try {
        const result = await action(...args);

        dispatch({ type: "success", payload: result });
        return result;
      } catch (error) {
        let errorMessage = "Something went wrong. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }

        dispatch({
          type: "error",
          payload: errorMessage,
          preserveData: opts?.preserveData,
        });
      }
    },
    [action, opts]
  );

  useEffect(() => {
    if (opts?.immediate) {
      execute(...opts.args);
    }
  }, [execute, opts]);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return { ...actionState, execute, reset };
}
