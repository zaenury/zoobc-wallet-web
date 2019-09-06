import { Injectable } from '@angular/core';

export interface Contact {
  alias: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  getContactList(): Contact[] {
    return JSON.parse(localStorage.getItem('CONTACT_LIST'));
  }

  getContact(address: string): Contact {
    const contacts: Contact[] =
      JSON.parse(localStorage.getItem('CONTACT_LIST')) || [];

    const empty = { address: '', alias: '' };
    return contacts.find(c => c.address == address) || empty;
  }

  addContact(newContact) {
    let contact = JSON.parse(localStorage.getItem('CONTACT_LIST'));
    contact = contact || [];
    contact.push(newContact);
    localStorage.setItem('CONTACT_LIST', JSON.stringify(contact));
  }

  deleteContact(address) {
    let contact = JSON.parse(localStorage.getItem('CONTACT_LIST'));

    for (let i = 0; i < contact.length; i++) {
      if (contact[i].address == address) {
        contact.splice(i, 1);
      }
    }
    localStorage.setItem('CONTACT_LIST', JSON.stringify(contact));
    return contact;
  }

  updateContact(oldContact, newContact) {
    let contact = JSON.parse(localStorage.getItem('CONTACT_LIST'));

    for (let i = 0; i < contact.length; i++) {
      if (contact[i].address == oldContact.address) {
        contact[i] = newContact;
      }
    }
    localStorage.setItem('CONTACT_LIST', JSON.stringify(contact));
    return contact;
  }
}