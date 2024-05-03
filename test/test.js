trên postman thông qua đường dẫn http://localhost:3001/api/get-place, tôi truyền vào{
    "id":"663296a6c38fea4f6098db39"
} thì nhận được {
    "success": true,
    "data": {
        "_id": "663296a6c38fea4f6098db39",
        "place_name": "place1",
        "description": "desc",
        "address": "place1",
        "cost": 30,
        "__v": 0
    }
}, vậy làm sao để lấy được data để sử dụng trên web
code ở đây
import React from 'react'

const Place = () => {
  return (
    <div>Place</div>
  )
}

export default Place