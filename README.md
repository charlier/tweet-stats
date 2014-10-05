# tweet-stats

> Sends tweet stats to StatsD

## Installation

```
npm install -g tweet-stats
```

You'll need to export your Twitter OAuth credentials:

```
export TWITTER_CONSUMER_KEY=...
export TWITTER_CONSUMER_SECRET=...
export TWITTER_ACCESS_TOKEN=...
export TWITTER_ACCESS_TOKEN_SECRET=...
```

## Usage

```
Usage: tweet-stats [options] <search_query> <metric_name>

Options:

  -h, --help         output usage information
  -V, --version      output the version number
  -P, --port [port]  StatsD port [8125]
  -H, --host [host]  StatsD host [localhost]
```

For example, to increment the StatsD counter `twitter.apple` whenever a public tweet mentions the word 'apple':

```
tweet-stats apple twitter.apple
```