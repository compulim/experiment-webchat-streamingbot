import { EventSourceParserStream } from 'eventsource-parser/stream';
// import { readableStreamValues } from 'iter-fest';

export default async function* parseEventSourceFromPlainText(plainText) {
  const plainTextStream = new ReadableStream({
    start(controller) {
      controller.enqueue(plainText);
    }
  });

  const eventSourceStream = plainTextStream
    // .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream());

  // return readableStreamValues(eventSourceStream);

  const reader = eventSourceStream.getReader();

  for (;;) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    yield value;
  }

  // const iterator = {
  //   [Symbol.asyncIterator]() {
  //     return iterator;
  //   },
  //   async next() {
  //     // return reader.read();

  //     const result = await reader.read();

  //     console.log(result);

  //     return result;
  //   }
  // };

  // console.log('got iterator', iterator);

  // return iterator;
}
