export interface CarForm {
    updatedName: string;
    updatedColor: string;
    onNameChange: (value: string) => void;
    onColorChange: (value: string) => void;
    onSave: () => void;
}
