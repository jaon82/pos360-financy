import { Mail } from 'lucide-react';
import { Field, FieldDescription, FieldLabel } from './components/ui/field';
import { Input } from './components/ui/input';

function App() {
  return (
    <div className="border h-50 display flex items-center justify-center max-w-5xl m-0 m-auto">
      <Field>
        <FieldLabel htmlFor="name">Label</FieldLabel>
        <Input
          id="name"
          autoComplete="off"
          placeholder="Evil Rabbit"
          icon={Mail}
          //hasError
          value="Teste"
          disabled
        />
        <FieldDescription>Helper/Error</FieldDescription>
      </Field>
    </div>
  );
}

export default App;
