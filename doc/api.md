# 接口

## 接入页（无需登录的接口）

### 接口地址

`http://${config.apiServer.host}:${config.apiServer.port}/api/user/signup`

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

| 字段名      | 类型                    | 说明               | 示例                |
| ----------- | ----------------------- | ------------------ | ------------------- |
| code        | Number:Int              |   代码             | 0                   |
| message     | String                  |   说明信息         | "操作成功"          |
| data        | Object/Array            |   数据             |  {}                 |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 添加发布信息（需要登录的接口）

### 接口地址

`http://${config.apiServer.host}:${config.apiServer.port}/api/message/add`

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

| 字段名      | 类型                    | 说明               | 示例                |
| ----------- | ----------------------- | ------------------ | ------------------- |
| code        | Number:Int              |   代码             | 0                   |
| message     | String                  |   说明信息         | "操作成功"          |
| data        | Object/Array            |   数据             |  {}                 |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": {}
}
```

## 获取多条消息（无需登录的接口）

### 接口地址

`http://${config.apiServer.host}:${config.apiServer.port}/api/message/getMessages`

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

| 字段名      | 类型                    | 说明               | 示例                |
| ----------- | ----------------------- | ------------------ | ------------------- |
| code        | Number:Int              |   代码             | 0                   |
| message     | String                  |   说明信息         | "操作成功"          |
| data        | Array                   |   数据             |  []                 |

### 回参示例

```json
{
  "code": 0,
  "message": "操作成功",
  "data": [
    {
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
