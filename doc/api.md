# 接口

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [用户认证](#%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81)
- [更新用户信息](#%E6%9B%B4%E6%96%B0%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
- [获取用户信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
- [添加发布信息（需要登录的接口）](#%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%B8%83%E4%BF%A1%E6%81%AF%E9%9C%80%E8%A6%81%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [获取多条消息（无需登录的接口）](#%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E6%97%A0%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [通过userId获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87userid%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [通过userId和消息类型获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87userid%E5%92%8C%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [通过消息类型获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [通过时间段获取多条消息（需登录的接口）](#%E9%80%9A%E8%BF%87%E6%97%B6%E9%97%B4%E6%AE%B5%E8%8E%B7%E5%8F%96%E5%A4%9A%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [通过mid删除一条消息（需登录的接口）](#%E9%80%9A%E8%BF%87mid%E5%88%A0%E9%99%A4%E4%B8%80%E6%9D%A1%E6%B6%88%E6%81%AF%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [发起聊天（需要登录的接口）](#%E5%8F%91%E8%B5%B7%E8%81%8A%E5%A4%A9%E9%9C%80%E8%A6%81%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 用户认证

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/user/auth`

> 入参

| 字段名    | 类型   | 是否必填 | 说明   | 示例                               |
|-----------|--------|----------|--------|------------------------------------|
| loginCode | String | 必填 | 登录码 | "003mMmZs0UpONa18UuYs0BPzZs0mMmZ7" |

> 入参示例

```json
{
  "loginCode": "003mMmZs0UpONa18UuYs0BPzZs0mMmZ7"
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {
    "userId": 1,
    "SESSION_ID": "460rBfVcYJdBuft04gHeIfi2HrCwnFhy"
  }
}
```

## 更新用户信息

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/user/update`

> 入参

| 字段名   | 类型                   | 是否必填 | 说明     | 示例                                                                                                                         |
|----------|------------------------|----------|----------|------------------------------------------------------------------------------------------------------------------------------|
| userId   | Number:Int             | 必填     | 用户id   | 1                                                                                                                            |
| nick     | String                 | 必填     | 微信昵称 | "Clare Chen"                                                                                                                 |
| gender   | enum('MAIL', 'FEMAIL') | 必填     | 性别     | "MAIL"                                                                                                                       |
| language | String                 | 必填     | 语言     | "zh_CN"                                                                                                                      |
| city     | String                 | 必填     | 市       | "Xi'an"                                                                                                                      |
| province | String                 | 必填     | 省       | "Shaanxi"                                                                                                                     |
| country  | String                 | 必填     | 国       | "China"                                                                                                                         |
| avatar   | String                 | 必填     | 头像链接 | "http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0" |
| tag      | Array                  | 必填     | 标签     | ["乐观","王者荣耀","游泳"]                                                                                                   |

> 入参示例

```json
{
  "userId": 1,
  "nick": "Clare Chen",
  "gender": "MAIL",
  "language": "zh_CN",
  "city": "Xi'an",
  "province": "Shaanxi",
  "country": "China",
  "avatar": "http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0",
  "tag": ["乐观","王者荣耀","游泳"]
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 获取用户信息

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/user/getUserInfo`

> 入参

| 字段名 | 类型       | 是否必填 | 说明   | 示例 |
|--------|------------|----------|--------|------|
| userId | Number:Int | 必填     | 用户id | 1    |

> 入参示例

```json
{
  "userId": 1
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {
    "nick": "",
    "gender": "FEMAIL",
    "tag": ""
  }
}
```


## 添加发布信息（需要登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/add`

> 入参

| 字段名  | 类型                               | 是否必填 | 说明                   | 示例                |
|---------|------------------------------------|----------|------------------------|---------------------|
| userId  | Number:Int                         | 必填     | 用户id                 | 1                   |
| type    | enum('String', 'Picture', 'Video') | 必填     | 消息类型               | String              |
| title   | String                             | 可选     | 标题                   | 今天天气不错        |
| topic   | String                             | 必填     | 话题(使用半角分号分隔) | 天气;晴朗           |
| content | String                             | 必填     | 内容数据               | 今天天气不错,很晴朗 |

> 入参示例

```json
{
  "userId": 1,
  "type": "String",
  "title": "今天天气不错",
  "topic": "天气;晴朗",
  "content": "今天天气不错,很晴朗"
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 获取多条消息（无需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getMessages`

> 入参

| 字段名    | 类型       | 是否必填 | 说明                      | 示例 |
|-----------|------------|----------|---------------------------|------|
| userId    | Number:Int | 可选     | 用户id                    | 1    |
| pageIndex | Number:Int | 必填     | 分页索引（默认为0，从0开始） | 0    |
| pageSize  | Number:Int | 必填     | 分页大小（默认为10）        | 10   |


> 入参示例

```json
{
  "userId": 1,
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "userId": 1,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    },
    {
      "mid": 2,
      "userId": 2,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过userId获取多条消息（需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getMessageByUserId`

> 入参

| 字段名       | 类型       | 是否必填 | 说明               | 示例 |
|--------------|------------|----------|--------------------|------|
| userId       | Number:Int | 必填     | 用户id             | 1    |
| targetUserId | Number:Int | 必填     | 目标用户id         | 2    |
| pageIndex    | Number:Int | 必填     | 分页索引（从0开始）  | 0    |
| pageSize     | Number:Int | 必填     | 分页大小（默认为10） | 10   |


> 入参示例
```json
{
  "userId": 1,
  "targetUserId": 2,
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 2,
      "userId": 2,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过userId和消息类型获取多条消息（需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getMessageByUserIdAndType`

> 入参

| 字段名       | 类型       | 是否必填 | 说明               | 示例   |
|--------------|------------|----------|--------------------|--------|
| userId       | Number:Int | 必填     | 用户id             | 1      |
| targetUserId | Number:Int | 必填     | 目标用户id         | 2      |
| type         | String     | 必填     | 消息类型           | String |
| pageIndex    | Number:Int | 必填     | 分页索引（从0开始）  | 0      |
| pageSize     | Number:Int | 必填     | 分页大小（默认为10） | 10     |


> 入参示例
```json
{
  "userId": 1,
  "targetUserId": 2,
  "type": "String",
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 2,
      "userId": 2,
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

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getMessageByType`

> 入参

| 字段名    | 类型       | 是否必填 | 说明               | 示例   |
|-----------|------------|----------|--------------------|--------|
| userId    | Number:Int | 必填     | 用户id             | 1      |
| type      | String     | 必填     | 消息类型           | String |
| pageIndex | Number:Int | 必填     | 分页索引（从0开始）  | 0      |
| pageSize  | Number:Int | 必填     | 分页大小（默认为10） | 10     |


> 入参示例
```json
{
  "type": "String",
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "userId": 1,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    },
    {
      "mid": 2,
      "userId": 2,
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

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getMessageByTime`

> 入参

| 字段名     | 类型       | 是否必填 | 说明               | 示例                  |
|------------|------------|----------|--------------------|-----------------------|
| userId     | Number:Int | 必填     | 用户id             | 1                     |
| start_time | String     | 必填     | 开始时间           | '2017-08-08 08:08:08' |
| end_time   | String     | 必填     | 结束时间           | '2017-08-16 16:16:16' |
| pageIndex  | Number:Int | 必填     | 分页索引（从0开始）  | 0                     |
| pageSize   | Number:Int | 必填     | 分页大小（默认为10） | 10                    |


> 入参示例
```json
{
  "userId": 1,
  "start_time": "2017-08-08 08:08:08",
  "end_time": "2017-08-16 16:16:16",
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "mid": 1,
      "userId": 1,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    },
    {
      "mid": 2,
      "userId": 2,
      "publish_time": "2017-08-11 10:10:03",
      "title": "今天天气不错",
      "topic": "天气;晴朗",
      "type": "String",
      "content": "今天天气不错,很晴朗"
    }
  ]
}
```

## 通过mid删除一条消息（需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/deleteMessageByMid`

> 入参

| 字段名 | 类型       | 是否必填 | 说明     | 示例 |
|--------|------------|----------|----------|------|
| userId | Number:Int | 必填     | 用户id   | 1    |
| mid    | Number:Int | 必填     | 消息索引 | 1    |



> 入参示例
```json
{
  "userId": 1,
  "mid": 1
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```


## 发起聊天（需要登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/chat/add`

> 入参

| 字段名       | 类型       | 是否必填 | 说明         | 示例                |
|--------------|------------|----------|--------------|---------------------|
| userId       | Number:Int | 必填     | 用户id       | 1                   |
| targetUserId | Number:Int | 必填     | 目标用户id   | 2                   |
| content      | String     | 必填     | 聊天内容数据 | 今天天气不错,很晴朗 |

> 入参示例

```json
{
  "userId": 1,
  "targetUserId": 2,
  "content": "今天天气不错,很晴朗"
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Object     | 必填     | 数据     | {}         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```


## 获取聊天记录（需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getChatlogs`

> 入参

| 字段名    | 类型       | 是否必填 | 说明                      | 示例 |
|-----------|------------|----------|---------------------------|------|
| userId    | Number:Int | 可选     | 用户id                    | 1    |
| pageIndex | Number:Int | 必填     | 分页索引（默认为0，从0开始） | 0    |
| pageSize  | Number:Int | 必填     | 分页大小（默认为10）        | 10   |


> 入参示例

```json
{
  "userId": 1,
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "id": 1,
      "from": 1,
      "to": 2,
      "chatlog": "今天天气不错,很晴朗",
      "timeline": "2017-08-28 10:21:46"
    }
  ]
}
```


## 获取两个用户的聊天记录（需登录的接口）

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/message/getChatByFromAndTo`

> 入参

| 字段名       | 类型       | 是否必填 | 说明                      | 示例 |
|--------------|------------|----------|---------------------------|------|
| userId       | Number:Int | 可选     | 用户id                    | 1    |
| targetUserId | Number:Int | 可选     | 目标用户id                | 2    |
| pageIndex    | Number:Int | 必填     | 分页索引（默认为0，从0开始） | 0    |
| pageSize     | Number:Int | 必填     | 分页大小（默认为10）        | 10   |

> 入参示例

```json
{
  "userId": 1,
  "targetUserId": 2,
  "pageIndex": 0,
  "pageSize": 10
}
```

> 回参

| 字段名  | 类型       | 是否必填 | 说明     | 示例       |
|---------|------------|----------|----------|------------|
| code    | Number:Int | 必填     | 代码     | 0          |
| message | String     | 必填     | 说明信息 | "操作成功" |
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
      "id": 1,
      "from": 1,
      "to": 2,
      "chatlog": "今天天气不错,很晴朗",
      "timeline": "2017-08-28 10:21:46"
    }
  ]
}
```
