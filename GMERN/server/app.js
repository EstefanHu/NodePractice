'use strict';
const express = require('express');
const { graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
  type Query {
    message: String
  }
`)
const app = express();