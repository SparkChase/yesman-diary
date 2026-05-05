# Error Handling

> How errors are handled in this project.

---

## Overview

Errors in API Routes are caught and returned as JSON with consistent status codes. No custom error classes — keep it simple.

---

## Error Types

| Error | Status Code | Example |
|-------|-------------|---------|
| Validation error | `400` | Missing required field in POST body |
| Unauthorized | `401` | Wrong password for private moments |
| Not found | `404` | Moment ID does not exist |
| Server error | `500` | Database connection failure |

---

## Error Handling Patterns

Wrap all route handler logic in try-catch:

```ts
export async function GET(request: Request) {
  try {
    const moments = await getPublicMoments();
    return Response.json(moments);
  } catch (error) {
    console.error("Failed to fetch moments:", error);
    return Response.json(
      { error: "Failed to fetch moments" },
      { status: 500 }
    );
  }
}
```

---

## API Error Responses

Standard format:

```json
{
  "error": "Human-readable error message"
}
```

No error codes or nested structures — this is a personal project, simplicity over completeness.

---

## Common Mistakes

- **Swallowing errors silently** — always log to console before returning 500
- **Returning stack traces to client** — never expose internal errors or stack traces in production
- **Using generic 500 for client errors** — validate input and return 400 when the client sends bad data
