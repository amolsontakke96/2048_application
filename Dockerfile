FROM python:3.11 AS builder

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir --target=/install -r requirements.txt

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /install /usr/local/lib/python3.11/site-packages

COPY --from=builder /app /app

EXPOSE 5000

CMD ["python3","-m","flask","--app","app","run","--host=0.0.0.0","--port=5000"]
