import React from 'react';

function SubscriptionComparison() {
  return (
    <div className="subscription-comparison">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Paid ($2/month)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Learn how the app works</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Learn food saving tips</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Learn food storage tips</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>View personal profile</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Dashboard by food type</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Access hundreds of foods</td>
            <td>Limited</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Save food items</td>
            <td>Limited</td>
            <td>Yes (categorized by type)</td>
          </tr>
          <tr>
            <td>Expiry notifications</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Food/Drink information</td>
            <td>Limited</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Add/Remove from list</td>
            <td>Limited</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionComparison;
