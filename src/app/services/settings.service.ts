import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

declare var firebase:any;
declare var Stripe: any;

@Injectable()
export class SettingsServiceProvider {
  userProfileRef:any = 'profiles';
  db:any;
  storage:any;

  public stripe;
  stripeKey;

  constructor() {
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });

    this.storage = firebase.storage().ref();

    this.stripeKey = location.origin.includes('localhost') ? 'pk_test_uArhHejNoezHGssTmjLG2SMT' : 'pk_live_OpIcl204jmYNz9sKfKXMSODA'
    this.stripe = new Stripe(this.stripeKey);
  }

  getUserSettings(uid): Promise<any> {
    return new Promise(resolve => {
      this.db.collection("settings").doc(uid).get().then(function(data) {
        const settings = data;
        resolve(settings.data());
      }).catch(function(error) {
        console.log(error.message);
      });
    });
  }

  saveUserSettings(init = false, newSettings, uid) {
    if (init) {
      this.db.collection("settings").doc(uid).set(newSettings);
    } else {
      this.db.collection("settings").doc(uid).update(newSettings);
      // return settings.data();
    }
  }

  stripeTokenHandler(token, uid) {
    this.db.collection("settings").doc(uid).update({
      stripePayment: token,
    })
  }

  stripeCustomerHandler(customer, uid) {
    this.db.collection("settings").doc(uid).update({
      stripeCustomer: customer,
    })
  }

  stripePlanHandler(plan, billingCycle, planTier,  uid) {
    this.db.collection("settings").doc(uid).update({
      stripePlan: plan,
      planTier: planTier,
      billingCycle: billingCycle
    })
  }

  stripeSubscriptionHandler(subscription, uid) {
    this.db.collection("settings").doc(uid).update({
      stripeSubscription: subscription,
    })
  }

  cancelSubscription(uid) {
    this.db.collection("settings").doc(uid).update({
      stripeSubscription: null,
      stripePlan: null,
    })
  }

}
