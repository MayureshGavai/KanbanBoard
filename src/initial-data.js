const initialData = {
  tasks: {
    "task-1": {
      "id": "task-1",
      "content": "Implement new feature for user profile customization",
      "priority": "high",
      "description": "The user profile customization feature aims to provide users with the ability to personalize their profiles by adding custom avatars, cover photos, and bio descriptions."
    },
    "task-2": {
      "id": "task-2",
      "content": "Fix bug in login functionality",
      "priority": "medium",
      "description": "The login functionality currently experiences a bug where some users are unable to log in successfully, resulting in a poor user experience."
    },
    "task-3": {
      "id": "task-3",
      "content": "Optimize database queries for improved performance",
      "priority": "high",
      "description": "Database queries are causing performance issues, leading to slow loading times and decreased overall system efficiency."
    },
    "task-4": {
      "id": "task-4",
      "content": "Conduct security audit and implement necessary fixes",
      "priority": "low",
      "description": "A comprehensive security audit is required to identify vulnerabilities in the system and address potential security threats."
    },
    "task-5": {
      "id": "task-5",
      "content": "Design and implement UI/UX enhancements",
      "priority": "medium",
      "description": "Improving the user interface and experience is essential for increasing user engagement and retention."
    },
    "task-6": {
      "id": "task-6",
      "content": "Create automated testing suite for regression testing",
      "priority": "low",
      "description": "An automated testing suite is needed to streamline the regression testing process and ensure the stability and reliability of the software."
    },
    "task-7": {
      "id": "task-7",
      "content": "Optimize server infrastructure for scalability",
      "priority": "high",
      "description": "The current server infrastructure is struggling to handle increasing user load, leading to performance degradation."
    },
    "task-8": {
      "id": "task-8",
      "content": "Implement multi-factor authentication for enhanced security",
      "priority": "medium",
      "description": "Enhancing security measures is crucial to protect user accounts from unauthorized access and data breaches."
    },
    "task-9": {
      "id": "task-9",
      "content": "Refactor codebase for improved maintainability",
      "priority": "low",
      "description": "The codebase has become increasingly complex and difficult to maintain, hindering development velocity."
    },
    "task-10": {
      "id": "task-10",
      "content": "Conduct performance testing and optimization",
      "priority": "high",
      "description": "Performance testing is essential to identify bottlenecks and optimize system performance for optimal responsiveness."
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task-1", "task-4", "task-5"],
    },
    "column-2": { id: "column-2", title: "In Progress", taskIds: ["task-6","task-3","task-8"] },
    "column-3": { id: "column-3", title: "Pending", taskIds: ["task-2","task-9","task-7"] },
    "column-4": { id: "column-4", title: "Complete", taskIds: ["task-10"] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  priority: ["low", "medium", "high"],
};

export default initialData;
