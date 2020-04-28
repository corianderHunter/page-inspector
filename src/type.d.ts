type TimeKey = number;

interface RecordItem {
  [key: string]: any[];
}

interface Records {
  [key: number]: RecordItem;
}

type RecordTakeEvent = (record: object, prop?: string) => void;

type InputNode = HTMLInputElement | HTMLSelectElement;
