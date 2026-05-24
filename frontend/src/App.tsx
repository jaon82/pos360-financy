import { Mail } from 'lucide-react';
import TransactionTypeIndicator from './components/TransactionType';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Field, FieldDescription, FieldLabel } from './components/ui/field';
import { Input } from './components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

function App() {
  const items = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  return (
    <div className="border h-screen display flex flex-col gap-2 items-center justify-center max-w-5xl my-0 mx-auto">
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
      <Button size="sm">
        <Mail />
        Button
      </Button>
      <Button variant="outline" size="sm" disabled>
        <Mail />
        Button
      </Button>
      <Button size="icon" variant="outline" disabled>
        <Mail color="red" />
      </Button>
      <Button variant="link">Link</Button>
      <Button variant="outline" size="icon" disabled>
        1
      </Button>
      <Field>
        <FieldLabel htmlFor="name">Label</FieldLabel>
        <Select items={items}>
          <SelectTrigger className="w-[180px]">
            <Mail className="text-gray-800" />
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>Helper/Error</FieldDescription>
      </Field>
      <div className="grid grid-cols-4 gap-10">
        <Badge className="bg-gray-200 text-gray-700">Label</Badge>
        <Badge className="bg-blue-light text-blue-dark">Label</Badge>
        <Badge className="bg-purple-light text-purple-dark">Label</Badge>
        <Badge className="bg-pink-light text-pink-dark">Label</Badge>
        <Badge className="bg-red-light text-red-dark">Label</Badge>
        <Badge className="bg-orange-light text-orange-dark">Label</Badge>
        <Badge className="bg-yellow-light text-yellow-dark">Label</Badge>
        <Badge className="bg-green-light text-green-dark">Label</Badge>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <TransactionTypeIndicator type="income" />
        <TransactionTypeIndicator type="outcome" />
        <TransactionTypeIndicator type="income" variant="icon" />
        <TransactionTypeIndicator type="outcome" variant="icon" />
      </div>
    </div>
  );
}

export default App;
