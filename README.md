# kaiburr-frontend-ui
Frontend UI for the Kaiburr Full-Stack Assessment (Tasks 3).

# Kaiburr Full-Stack Assessment: React UI

This repository contains the React and TypeScript frontend application for Task 3 of the Kaiburr assessment. It provides a user interface to interact with the backend API, allowing users to create, view, search, execute, and delete tasks.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the Ant Design component library.

---

## Prerequisites

To build and run this project locally, you will need the following software installed:

* **Node.js** (LTS version recommended)
* **npm** (which comes bundled with Node.js)

---

## Getting Started

Follow these steps to get the development environment running on your local machine.

### 1. Backend Setup

This frontend requires the backend API from Task 1 & 2 to be running and accessible. Please ensure the backend application is deployed to your local Kubernetes cluster (via Docker Desktop) and is available at `http://localhost:30080`.

### 2. Clone and Install

First, clone the repository and install the necessary npm packages.

```bash
# Clone the repository
git clone [https://github.com/TwsitedWizard/kaiburr-frontend-ui.git](https://github.com/TwsitedWizard/kaiburr-frontend-ui.git)

# Navigate into the project directory
cd kaiburr-frontend-ui/kaiburr-ui

# Install dependencies
npm install

---

## Final UI Screenshots

### Main View
This is the main interface of the Task Manager. It features a clean layout with a header, a search bar, a "Create Task" button, and the main table displaying the list of tasks with their respective actions.

![Main UI View]

***

### Create Task Modal
When the "Create Task" button is clicked, this modal appears, providing a form to enter the details for a new task. The "OK" button shows a loading state during form submission for better user feedback.

![Create Task Modal]

***

### Delete Confirmation
To prevent accidental deletions, a `Popconfirm` component is used. This provides a good user experience by asking for confirmation before performing a destructive action.

![Delete Confirmation]
