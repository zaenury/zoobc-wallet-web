/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.model.GenerateNodeKeyRequest', null, global);
goog.exportSymbol('proto.model.GenerateNodeKeyResponse', null, global);
goog.exportSymbol('proto.model.Node', null, global);
goog.exportSymbol('proto.model.NodeKey', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.Node = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.Node, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.Node.displayName = 'proto.model.Node';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.NodeKey = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.NodeKey, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.NodeKey.displayName = 'proto.model.NodeKey';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.GenerateNodeKeyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.GenerateNodeKeyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GenerateNodeKeyRequest.displayName = 'proto.model.GenerateNodeKeyRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.model.GenerateNodeKeyResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.model.GenerateNodeKeyResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.model.GenerateNodeKeyResponse.displayName = 'proto.model.GenerateNodeKeyResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.Node.prototype.toObject = function(opt_includeInstance) {
  return proto.model.Node.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.Node} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Node.toObject = function(includeInstance, msg) {
  var f, obj = {
    sharedaddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    address: jspb.Message.getFieldWithDefault(msg, 2, ""),
    port: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.Node}
 */
proto.model.Node.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.Node;
  return proto.model.Node.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.Node} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.Node}
 */
proto.model.Node.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSharedaddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPort(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.Node.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.Node.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.Node} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.Node.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSharedaddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string SharedAddress = 1;
 * @return {string}
 */
proto.model.Node.prototype.getSharedaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.model.Node.prototype.setSharedaddress = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string Address = 2;
 * @return {string}
 */
proto.model.Node.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.model.Node.prototype.setAddress = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 Port = 3;
 * @return {number}
 */
proto.model.Node.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.model.Node.prototype.setPort = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.NodeKey.prototype.toObject = function(opt_includeInstance) {
  return proto.model.NodeKey.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.NodeKey} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.NodeKey.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    publickey: msg.getPublickey_asB64(),
    seed: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.NodeKey}
 */
proto.model.NodeKey.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.NodeKey;
  return proto.model.NodeKey.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.NodeKey} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.NodeKey}
 */
proto.model.NodeKey.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPublickey(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSeed(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.NodeKey.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.NodeKey.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.NodeKey} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.NodeKey.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getPublickey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getSeed();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {number}
 */
proto.model.NodeKey.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.model.NodeKey.prototype.setId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional bytes PublicKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.model.NodeKey.prototype.getPublickey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes PublicKey = 2;
 * This is a type-conversion wrapper around `getPublickey()`
 * @return {string}
 */
proto.model.NodeKey.prototype.getPublickey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPublickey()));
};


/**
 * optional bytes PublicKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPublickey()`
 * @return {!Uint8Array}
 */
proto.model.NodeKey.prototype.getPublickey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPublickey()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.NodeKey.prototype.setPublickey = function(value) {
  jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional string Seed = 3;
 * @return {string}
 */
proto.model.NodeKey.prototype.getSeed = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.model.NodeKey.prototype.setSeed = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.GenerateNodeKeyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GenerateNodeKeyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GenerateNodeKeyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GenerateNodeKeyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.GenerateNodeKeyRequest}
 */
proto.model.GenerateNodeKeyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GenerateNodeKeyRequest;
  return proto.model.GenerateNodeKeyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GenerateNodeKeyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GenerateNodeKeyRequest}
 */
proto.model.GenerateNodeKeyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.GenerateNodeKeyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GenerateNodeKeyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GenerateNodeKeyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GenerateNodeKeyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.model.GenerateNodeKeyResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.model.GenerateNodeKeyResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.model.GenerateNodeKeyResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GenerateNodeKeyResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    nodepublickey: msg.getNodepublickey_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.model.GenerateNodeKeyResponse}
 */
proto.model.GenerateNodeKeyResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.model.GenerateNodeKeyResponse;
  return proto.model.GenerateNodeKeyResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.model.GenerateNodeKeyResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.model.GenerateNodeKeyResponse}
 */
proto.model.GenerateNodeKeyResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setNodepublickey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.model.GenerateNodeKeyResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.model.GenerateNodeKeyResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.model.GenerateNodeKeyResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.model.GenerateNodeKeyResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNodepublickey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes NodePublicKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.model.GenerateNodeKeyResponse.prototype.getNodepublickey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes NodePublicKey = 1;
 * This is a type-conversion wrapper around `getNodepublickey()`
 * @return {string}
 */
proto.model.GenerateNodeKeyResponse.prototype.getNodepublickey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getNodepublickey()));
};


/**
 * optional bytes NodePublicKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNodepublickey()`
 * @return {!Uint8Array}
 */
proto.model.GenerateNodeKeyResponse.prototype.getNodepublickey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getNodepublickey()));
};


/** @param {!(string|Uint8Array)} value */
proto.model.GenerateNodeKeyResponse.prototype.setNodepublickey = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


goog.object.extend(exports, proto.model);
