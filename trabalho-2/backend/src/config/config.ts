import 'dotenv/config';

type ServerConfig = {
  env: string;
  ip: string;
  port: number;
}

type DatabaseConfig = {
  connectionURI: string;
  numberOfConnections: number;
}

type Config = {
  server: ServerConfig;
  database: DatabaseConfig;
};

const composeConnectionURI = (): string => {
  const member1Host = process.env.DB_REPLICA_SET_MEMBER_1_HOST;
  const member1Port = Number(process.env.DB_REPLICA_SET_MEMBER_1_PORT);

  const member2Host = process.env.DB_REPLICA_SET_MEMBER_2_HOST;
  const member2Port = Number(process.env.DB_REPLICA_SET_MEMBER_2_PORT);

  const member3Host = process.env.DB_REPLICA_SET_MEMBER_3_HOST;
  const member3Port = Number(process.env.DB_REPLICA_SET_MEMBER_3_PORT);

  const hostsAndPorts = [];

  if (member1Host && member1Port) {
    hostsAndPorts.push(`${member1Host}:${member1Port}`);
  }

  if (member2Host && member2Port) {
    hostsAndPorts.push(`${member2Host}:${member2Port}`);
  }

  if (member3Host && member3Port) {
    hostsAndPorts.push(`${member3Host}:${member3Port}`);
  }

  const replicaSetNumberOfConnections = Number(process.env.DB_REPLICA_SET_NUMBER_OF_CONNECTIONS);
  const selectedHostsAndPorts = [];

  if (replicaSetNumberOfConnections <= 1) {
    selectedHostsAndPorts.push(hostsAndPorts[0]);
  } else if (replicaSetNumberOfConnections >= hostsAndPorts.length) {
    selectedHostsAndPorts.push(...hostsAndPorts);
  } else {
    for (let i = 0; i < replicaSetNumberOfConnections; i++) {
      selectedHostsAndPorts.push(hostsAndPorts[i]);
    }
  }

  const databaseName = process.env.DB_NAME;
  const replicaSetName = process.env.DB_REPLICA_SET_NAME;

  return `mongodb://${selectedHostsAndPorts.join(',')}/${databaseName}?replicaSet=${replicaSetName}`;
};

export default {
  server: {
    env: process.env.NODE_ENV,
    ip: process.env.IP,
    port: Number(process.env.PORT)
  },
  database: {
    connectionURI: composeConnectionURI(),
    numberOfConnections: Number(process.env.DB_REPLICA_SET_NUMBER_OF_CONNECTIONS)
  }
} as Config;
