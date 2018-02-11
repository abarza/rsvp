import React, { Component } from "react" 
import "./App.css"
import GuestList from "./GuestList" 
import Counter from "./Counter"

class App extends Component {

  state = {
    ifFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: "Treasure",
        isConfirmed: false,
        isEditing: false
      },
      {
        name: "nick",
        isConfirmed: true,
        isEditing: false
      },
      {
        name: "pancho",
        isConfirmed: true,
        isEditing: false
      }
    ]
  }

  toggleGuestPropertynAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            //name: guest.name,
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest
      })
    })

  toggleConfirmationAt = index =>
    this.toggleGuestPropertynAt("isConfirmed", index)
    
  toggleEditingAt = index =>
    this.toggleGuestPropertynAt("isEditing", index)
  
  removeGuestsAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    })

  setNameAt = (name, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            //name: guest.name,
            ...guest,
            name
          }
        }
        return guest
      })
    })

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered})

  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value })

  newGuestSubmitHandler = e => {
    e.preventDefault()
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }
  
  getTotalInvited = () => this.state.guests.length

  getAttendingGuests = () => 
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 
      0)

  render() {
    const totalInvited = this.getTotalInvited()
    const numberAttending = this.getAttendingGuests()
    const numberUnconfirmed = totalInvited - numberAttending
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input 
              type="text" 
              onChange={this.handleNameInput}
              value={this.state.pendingGuest} 
              placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox" 
                onChange={this.toggleFilter}
                checked={this.state.isFiltered} /> Hide those who haven't responded
            </label>
          </div>
          <Counter
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />
          <GuestList 
            guests={this.state.guests} 
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestsAt={this.removeGuestsAt}
            pendingGuest={this.state.pendingGuest} />
        </div>
      </div>
    )
  }
}

export default App
