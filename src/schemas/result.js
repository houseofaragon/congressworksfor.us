'use strict'
import { Schema, arrayOf } from 'normalizr'

export const result = new Schema('results')
export const arrayOfResults = arrayOf(result)
