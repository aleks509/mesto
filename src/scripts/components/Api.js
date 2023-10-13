
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
      } else {
        Promise.reject(`Что-то пошло не так: ${response.status}`)
      }
    })
  }
  // /cards
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
        .then((response) => {
        if (response.ok) {
        return response.json() //всегда возращать  данные
      } else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`)
      }
    })
}
// /users/me
  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then((response) => {
      if (response.ok) {
      return response.json() //всегда возращать  данные
    } else {
      return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }
  })
    }
    //  /cards
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`)
      }
    })
  }

}
