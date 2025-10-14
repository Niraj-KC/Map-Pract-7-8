// __mocks__/kafkajs.js
module.exports = {
  Kafka: jest.fn().mockImplementation(() => ({
    producer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      send: jest.fn(),
      disconnect: jest.fn(),
    }),
  })),
  logLevel: { NOTHING: 0 },
};
