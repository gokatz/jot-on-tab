import { h, render } from 'preact';
import Input from './components/input';
import Notes from './components/notes';

const App = () => {
  return (
    <div>
      <div class="container mx-auto mt-28">
        <div class="flex justify-center">
          <Input />
        </div>

        <div class="flex justify-center">
          <Notes />
        </div>
      </div>
    </div>

  )
};

render(<App />, document.body);