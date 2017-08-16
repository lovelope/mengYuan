<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [接口](#%E6%8E%A5%E5%8F%A3)
  - [接入页（无需登录的接口）](#%E6%8E%A5%E5%85%A5%E9%A1%B5%E6%97%A0%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80)
    - [入参](#%E5%85%A5%E5%8F%82)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B)
    - [回参](#%E5%9B%9E%E5%8F%82)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B)
  - [添加发布信息（需要登录的接口）](#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B8%83%E4%BF%A1%E6%81%AF%E9%9C%80%E8%A6%81%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-1)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-1)
    - [入参](#%E5%85%A5%E5%8F%82-1)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-1)
    - [回参](#%E5%9B%9E%E5%8F%82-1)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-1)
  - [获取多条消息（无需登录的接口）](#%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E6%97%A0%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-2)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-2)
    - [入参](#%E5%85%A5%E5%8F%82-2)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-2)
    - [回参](#%E5%9B%9E%E5%8F%82-2)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-2)
  - [通过微信号获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E5%BE%AE%E4%BF%A1%E5%8F%B7%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-3)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-3)
    - [入参](#%E5%85%A5%E5%8F%82-3)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-3)
    - [回参](#%E5%9B%9E%E5%8F%82-3)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-3)
  - [通过微信号和消息类型获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E5%BE%AE%E4%BF%A1%E5%8F%B7%E5%92%8C%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-4)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-4)
    - [入参](#%E5%85%A5%E5%8F%82-4)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-4)
    - [回参](#%E5%9B%9E%E5%8F%82-4)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-4)
  - [通过消息类型获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-5)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-5)
    - [入参](#%E5%85%A5%E5%8F%82-5)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-5)
    - [回参](#%E5%9B%9E%E5%8F%82-5)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-5)
  - [通过时间段获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E6%97%B6%E9%97%B4%E6%AE%B5%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
    - [请求方法：`POST`](#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95post-6)
    - [接口地址](#%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80-6)
    - [入参](#%E5%85%A5%E5%8F%82-6)
    - [入参示例](#%E5%85%A5%E5%8F%82%E7%A4%BA%E4%BE%8B-6)
    - [回参](#%E5%9B%9E%E5%8F%82-6)
    - [回参示例](#%E5%9B%9E%E5%8F%82%E7%A4%BA%E4%BE%8B-6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 接口

## 接入页（无需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/user/signup`

### 入参

| 字段名 | 类型                   | 说明                         | 示例                             |
|--------|------------------------|------------------------------|----------------------------------|
| wechat | String                 | 微信号                       | wechat11                         |
| gender | enum('MAIL', 'FEMAIL') | 性别                         | FEMAIL                           |
| nature | String                 | 特点或性格(使用半角分号分隔) | 乐观;王者荣耀钻石段              |
| expect | String                 | 期望的特点或性格             | 乐观;会打篮球;王者荣耀钻石段以上 |

### 入参示例

```json
{
  "wechat": "wechat11",
  "gender": "FEMAIL",
  "nature": "乐观;王者荣耀钻石段",
  "expect": "乐观;会打篮球;王者荣耀钻石段以上"
}
```

### 回参

| 字段名  | 类型         | 说明     | 示例       |
|---------|--------------|----------|------------|
| code    | Number:Int   | 代码     | 0          |
| message | String       | 说明信息 | "操作成功" |
| data    | Object/Array | 数据     | {}         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 添加发布信息（需要登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/add`

### 入参

| 字段名  | 类型                               | 说明                   | 示例                |
|---------|------------------------------------|------------------------|---------------------|
| wechat  | String                             | 微信号                 | wechat11            |
| type    | enum('String', 'Picture', 'Video') | 消息类型               | String              |
| title   | String                             | 标题                   | 今天天气不错        |
| topic   | String                             | 话题(使用半角分号分隔) | 天气;晴朗           |
| content | String                             | 内容数据               | 今天天气不错,很晴朗 |

### 入参示例

```json
{
  "wechat": "wechat11",
  "type": "String",
  "title": "今天天气不错",
  "topic": "天气;晴朗",
  "content": "今天天气不错,很晴朗"
}
```

### 回参

| 字段名  | 类型         | 说明     | 示例       |
|---------|--------------|----------|------------|
| code    | Number:Int   | 代码     | 0          |
| message | String       | 说明信息 | "操作成功" |
| data    | Object/Array | 数据     | {}         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 获取多条消息（无需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/getMessages`

### 入参

| 字段名    | 类型       | 说明               | 示例 |
|-----------|------------|--------------------|------|
| pageIndex | Number:Int | 分页索引（从0开始）  | 0    |
| pageSize  | Number:Int | 分页大小（默认为10） | 10   |


### 入参示例
```json
{
  "pageIndex": 0,
  "pageSize": 10
}
```

### 回参

| 字段名  | 类型       | 说明     | 示例       |
|---------|------------|----------|------------|
| code    | Number:Int | 代码     | 0          |
| message | String     | 说明信息 | "操作成功" |
| data    | Array      | 数据     | []         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "wechat": "wechat11",
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过微信号获取多条消息（需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/getMessageByWechat`

### 入参

| 字段名    | 类型       | 说明               | 示例     |
|-----------|------------|--------------------|----------|
| wechat    | String     | 微信号             | wechat11 |
| pageIndex | Number:Int | 分页索引（从0开始）  | 0        |
| pageSize  | Number:Int | 分页大小（默认为10） | 10       |


### 入参示例
```json
{
  "wechat": "wechat11",
  "pageIndex": 0,
  "pageSize": 10
}
```

### 回参

| 字段名  | 类型       | 说明     | 示例       |
|---------|------------|----------|------------|
| code    | Number:Int | 代码     | 0          |
| message | String     | 说明信息 | "操作成功" |
| data    | Array      | 数据     | []         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "wechat": "wechat11",
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过微信号和消息类型获取多条消息（需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/getMessageByWechatAndType`

### 入参

| 字段名    | 类型       | 说明               | 示例     |
|-----------|------------|--------------------|----------|
| wechat    | String     | 微信号             | wechat11 |
| type      | String     | 消息类型           | String   |
| pageIndex | Number:Int | 分页索引（从0开始）  | 0        |
| pageSize  | Number:Int | 分页大小（默认为10） | 10       |


### 入参示例
```json
{
  "wechat": "wechat11",
  "type": "String",
  "pageIndex": 0,
  "pageSize": 10
}
```

### 回参

| 字段名  | 类型       | 说明     | 示例       |
|---------|------------|----------|------------|
| code    | Number:Int | 代码     | 0          |
| message | String     | 说明信息 | "操作成功" |
| data    | Array      | 数据     | []         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "wechat": "wechat11",
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过消息类型获取多条消息（需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/getMessageByType`

### 入参

| 字段名    | 类型       | 说明               | 示例     |
|-----------|------------|--------------------|----------|
| type      | String     | 消息类型           | String   |
| pageIndex | Number:Int | 分页索引（从0开始）  | 0        |
| pageSize  | Number:Int | 分页大小（默认为10） | 10       |


### 入参示例
```json
{
  "type": "String",
  "pageIndex": 0,
  "pageSize": 10
}
```

### 回参

| 字段名  | 类型       | 说明     | 示例       |
|---------|------------|----------|------------|
| code    | Number:Int | 代码     | 0          |
| message | String     | 说明信息 | "操作成功" |
| data    | Array      | 数据     | []         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "wechat": "wechat11",
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过时间段获取多条消息（需登录的接口）

### 请求方法：`POST`

### 接口地址

`http://${config.apiServer.host}/api/message/getMessageByTime`

### 入参

| 字段名     | 类型       | 说明               | 示例                  |
|------------|------------|--------------------|-----------------------|
| start_time | String     | 开始时间           | '2017-08-08 08:08:08' |
| end_time   | String     | 结束时间           | '2017-08-16 16:16:16' |
| pageIndex  | Number:Int | 分页索引（从0开始）  | 0                     |
| pageSize   | Number:Int | 分页大小（默认为10） | 10                    |


### 入参示例
```json
{
  "start_time": "2017-08-08 08:08:08",
  "end_time": "2017-08-16 16:16:16",
  "pageIndex": 0,
  "pageSize": 10
}
```

### 回参

| 字段名  | 类型       | 说明     | 示例       |
|---------|------------|----------|------------|
| code    | Number:Int | 代码     | 0          |
| message | String     | 说明信息 | "操作成功" |
| data    | Array      | 数据     | []         |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "wechat": "wechat11",
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```
