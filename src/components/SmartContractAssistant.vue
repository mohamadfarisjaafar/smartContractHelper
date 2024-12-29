<template>
    <div class="smart-contract-assistant-container">
      <h1>Blockchain Smart Contract Assistant</h1>
  
      <!-- Code Input -->
      <textarea v-model="smartContractCode" placeholder="Paste your smart contract code here..." rows="15" cols="60"></textarea>
  
      <!-- Submit Button -->
      <button @click="getContractAnalysis">Analyze Smart Contract</button>
  
      <!-- Result Display -->
      <div v-if="isLoading" class="loading">Loading...</div>
  
      <div v-if="contractExplanation">
        <h2>Contract Analysis</h2>
        <pre>{{ contractExplanation }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        smartContractCode: '',
        contractExplanation: '',
        isLoading: false,
      };
    },
    methods: {
      async getContractAnalysis() {
        if (!this.smartContractCode.trim()) {
          alert('Please paste some smart contract code!');
          return;
        }
  
        this.isLoading = true;
        try {
          const response = await fetch('http://localhost:3000/analyze-contract', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: this.smartContractCode }),
          });
  
          const data = await response.json();
          this.contractExplanation = data.explanation;
        } catch (error) {
          console.error('Error:', error);
          alert('Error analyzing the contract!');
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-family: monospace;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  pre {
    background-color: #f4f4f4;
    padding: 10px;
  }
  
  .loading {
    font-size: 20px;
    color: blue;
    margin-top: 20px;
  }
  </style>
  