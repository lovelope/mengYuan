/*
 Navicat MySQL Data Transfer

 Source Server         : 172.18.33.2_3306
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : 172.18.33.2:3306
 Source Schema         : mengyuan

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 16/08/2017 13:43:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `mid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '消息ID，主键',
  `publish_time` datetime(0) NOT NULL COMMENT '消息发布时间',
  `wechat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微信号，参照user表wechat',
  `type` enum('String','Picture','Video') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'String' COMMENT '消息类型，可选String,Picture,Video',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '消息内容，当type为Picture或Video时为路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '消息标题',
  `topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '话题',
  PRIMARY KEY (`mid`) USING BTREE,
  INDEX `wechat`(`wechat`) USING BTREE,
  INDEX `publish_time`(`publish_time`) USING BTREE,
  CONSTRAINT `wechat` FOREIGN KEY (`wechat`) REFERENCES `user` (`wechat`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for message_bak
-- ----------------------------
DROP TABLE IF EXISTS `message_bak`;
CREATE TABLE `message_bak`  (
  `mid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '消息ID，主键',
  `publish_time` datetime(0) NOT NULL COMMENT '消息发布时间',
  `wechat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微信号，参照user表wechat',
  `type` enum('String','Picture','Video') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'String' COMMENT '消息类型，可选String,Picture,Video',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '消息内容，当type为Picture或Video时为路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '消息标题',
  `topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '话题',
  PRIMARY KEY (`mid`) USING BTREE,
  INDEX `wechat`(`wechat`) USING BTREE,
  INDEX `publish_time`(`publish_time`) USING BTREE,
  CONSTRAINT `message_bak_ibfk_1` FOREIGN KEY (`wechat`) REFERENCES `user` (`wechat`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID，主键',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `avatar` mediumblob COMMENT '头像',
  `nick` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `gender` enum('MAIL','FEMAIL') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'MAIL' COMMENT '性别',
  `wechat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微信号',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `nature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '性格或特点',
  `expect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '期望的性格或特点',
  `detail_info` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '简介',
  `create_time` datetime(0) DEFAULT NULL COMMENT '账户创建时间',
  `modified_time` datetime(0) DEFAULT NULL COMMENT '账户修改时间',
  `level` smallint(5) NOT NULL DEFAULT 2 COMMENT '账户等级：0=>最高管理员，1=>管理员，2=>用户',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `wechat`(`wechat`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
