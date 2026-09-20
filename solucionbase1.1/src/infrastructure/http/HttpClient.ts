export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP ${status}`);
  }
}

export class HttpClient {
  constructor(private readonly baseUrl: string) {}

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new HttpError(response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(0);
    }
  }
}
