# 接口

## 接入页

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
