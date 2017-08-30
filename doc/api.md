# 接口

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [用户认证](#%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81)
- [更新用户信息](#%E6%9B%B4%E6%96%B0%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
- [推荐萌友](#%E6%8E%A8%E8%8D%90%E8%90%8C%E5%8F%8B)
- [获取萌友列表](#%E8%8E%B7%E5%8F%96%E8%90%8C%E5%8F%8B%E5%88%97%E8%A1%A8)
- [获取用户信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
- [发起聊天（需要登录的接口）](#%E5%8F%91%E8%B5%B7%E8%81%8A%E5%A4%A9%E9%9C%80%E8%A6%81%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [获取聊天记录（需登录的接口）](#%E8%8E%B7%E5%8F%96%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)
- [获取两个用户的聊天记录（需登录的接口）](#%E8%8E%B7%E5%8F%96%E4%B8%A4%E4%B8%AA%E7%94%A8%E6%88%B7%E7%9A%84%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95%E9%9C%80%E7%99%BB%E5%BD%95%E7%9A%84%E6%8E%A5%E5%8F%A3)

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

| 字段名    | 类型                   | 是否必填 | 说明         | 示例                                                                                                                         |
|-----------|------------------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------|
| userId    | Number:Int             | 必填     | 用户id       | 1                                                                                                                            |
| nick      | String                 | 必填     | 微信昵称     | "Clare Chen"                                                                                                                 |
| gender    | enum('MAIL', 'FEMAIL') | 必填     | 性别         | "MAIL"                                                                                                                       |
| language  | String                 | 必填     | 语言         | "zh_CN"                                                                                                                      |
| city      | String                 | 必填     | 市           | "Xi'an"                                                                                                                      |
| province  | String                 | 必填     | 省           | "Shaanxi"                                                                                                                    |
| country   | String                 | 必填     | 国           | "China"                                                                                                                      |
| avatar    | String                 | 必填     | 头像链接     | "http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0" |
| tag       | Array                  | 必填     | 标签         | ["乐观","王者荣耀","游泳"]                                                                                                   |
| recommend | Number:Int             | 必填     | 推荐人userId | 28                                                                                                                           |

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
  "tag": ["乐观","王者荣耀","游泳"],
  "recommend": 28
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

## 推荐萌友

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/user/recommend`

> 入参

| 字段名    | 类型                   | 是否必填 | 说明         | 示例                                                                                                                         |
|-----------|------------------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------|
| userId    | Number:Int             | 必填     | 用户id       | 1                                                                                                                            |


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
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": []
}
```

## 获取萌友列表

> 请求方法：`POST`

> 接口地址

`http://${config.apiServer.host}/api/user/getFriends`

> 入参

| 字段名    | 类型                   | 是否必填 | 说明         | 示例                                                                                                                         |
|-----------|------------------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------|
| userId    | Number:Int             | 必填     | 用户id       | 1                                                                                                                            |


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
| data    | Array      | 必填     | 数据     | []         |

> 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": []
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
