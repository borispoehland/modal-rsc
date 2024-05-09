export type IServerActionReturn =
  | { status: "success"; message: string }
  | {
      status: "error";
      error: string;
    };

type IServerAction<I, O> = (prevState: O, input: I) => Promise<O>;

export type WithServerAction<I> = {
  action: IServerAction<I, IServerActionReturn>;
};
