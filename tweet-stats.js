#! /usr/bin/env node

var program = require('commander');
var colors = require('chalk');
var Twit = require('twit');
var package = require('./package');
var StatsD = require('node-statsd').StatsD;

program
  .version(package.version)
  .usage('[options] <search_query> <metric_name>')
  .option('-P, --port [port]', 'StatsD port [8125]', 8125)
  .option('-H, --host [host]', 'StatsD host [localhost]', 'localhost')
  .option('-v, --verbose', 'enable verbose logging')
  .parse(process.argv);

if (program.args.length !== 2) {
  program.outputHelp();
  process.exit(1);
}

var query = program.args[0];
var metric = program.args[1];

// Initialize Twitter client
var twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Initialize StatsD client
var client = new StatsD({
  port: program.port,
  host: program.host
});

client.socket.on('error', function (err) {
  console.error(err.stack);
});

// Listen for tweets matching query
var stream = twit.stream('statuses/filter', { track: query });

stream.on('tweet', function (tweet) {
  if (program.verbose) {
    console.log(tweet.text);
  }

  client.increment(metric);
});

stream.on('error', function (err) {
  console.error(err.message);
});

console.info(colors.yellow('Sending stats for query [' + query + '] as metric [' + metric + ']'));