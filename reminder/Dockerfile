FROM golang:1.18.1-alpine AS builder

RUN mkdir /build
ADD go.mod go.sum cmd/reminder/ /build/
WORKDIR /build
RUN go build

FROM alpine
USER root
RUN mkdir /app
RUN adduser -S -D -H -h /app appuser
RUN chown appuser /app
USER appuser
COPY --from=builder /build/reminder /app/
WORKDIR /app
CMD ["./reminder"]