
export default class Api {
  constructor({ url, headers}) {
    this._url = url, //https://mesto.nomoreparties.co/v1/cohort-77
    this._headers = headers
  }
// /users/me
 getUserInfo() {
     return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }


    })
  }
  // cards
//    getCards() {
//      fetch(`${this._url}cards`, {
//       headers: this._headers
//     })
//     if (response.ok) {
//       return response.json() //всегда возращать  данные
//     } else {
//        Promise.reject(`Что-то пошло не так: ${response.status}`)
//     }
//   }
}
