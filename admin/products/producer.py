import pika, json

params = pika.URLParameters(
    "amqps://hhiaaied:x_QbLIn4G_Z0ge6GA60lebPiBgQPDMGC@clam.rmq.cloudamqp.com/hhiaaied"
)

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(
        exchange="", routing_key="main", body=json.dumps(body), properties=properties
    )
