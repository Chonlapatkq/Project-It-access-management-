<template>
    <div class="container">
      <h1 class="text-center my-4">Asset Inventory</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Laptop</td>
            <td>Hardware</td>
            <td>In Use</td>
            <td>2025-12-31</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Monitor</td>
            <td>Hardware</td>
            <td>In Use</td>
            <td>2026-03-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AssetInventory',
  };
  </script>
  