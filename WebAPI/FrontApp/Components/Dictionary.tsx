export interface IKeyedCollection<T> {
    Add(key: number, value: T);
    ContainsKey(key: number): boolean;
    Count(): number;
    Item(key: number): T;
    Keys(): number[];
    Remove(key: number): T;
    Values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
    private items: { [index: number]: T } = {};

    private count: number = 0;

    public ContainsKey(key: number): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Add(key: number, value: T) {
        if (!this.items.hasOwnProperty(key))
            this.count++;

        this.items[key] = value;
    }

    public Remove(key: number): T {
        var val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }

    public Item(key: number): T {
        return this.items[key];
    }

    public Keys(): number[] {
        //var keySet: number[] = [];

        //for (var prop in this.items) {
        //    if (this.items.hasOwnProperty(prop)) {
        //        keySet.push(prop);
        //    }
        //}

        //return keySet;
        return [];
    }

    public Values(): T[] {
        var values: T[] = [];

        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }
}