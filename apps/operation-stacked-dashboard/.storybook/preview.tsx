import { useExerciseStore } from '../src/state/exerciseState';
import { useUserStore } from '../src/state/userState';
import { mockExercises } from './mocks/mockExercises';

const mockGlobalUseExerciseStore = () => {
  // Correctly using setExercises to update the exercises state
  useExerciseStore.setState({ exercises: mockExercises });

  // Assuming you want to set specific userId and username for your stories
  useUserStore.setState({
    userId: "1234", // Ensure this is a string if your store expects a string
    username: "Mocked User",
  });
};

class Story {
}

export const decorators = [
  (Story) => {
    // Initialize the Zustand stores with desired states before rendering the story
    mockGlobalUseExerciseStore(); // Now called without an argument

    return <Story />;
  },
];
