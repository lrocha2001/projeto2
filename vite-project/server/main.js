const redis = require('redis');

const client = redis.createClient({
    password: 'blIr2vth0AyJU5uzjgFjb4uZiCIrnRNX',
    socket: {
        host: 'redis-15685.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 15685
    }
});

client.on('connect', function() {
  console.log('Connected!');
});


async function main() {
    await client.connect();

    await client.set("kn", "Lolzeiro");
    const value = await client.get("kn");

    console.log(value);

    await client.quit();
}

main();
