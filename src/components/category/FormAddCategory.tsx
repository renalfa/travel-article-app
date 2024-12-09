import { Dispatch, FC, SetStateAction } from "react";
import Button from "../ui/button";
import InputField from "../ui/input-field";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  handleSubmit: () => void;
  handleCancelEdit?: () => void;
  isEditing?: boolean;
}

const FormAddCategory: FC<Props> = ({
  category,
  setCategory,
  isLoading,
  handleSubmit,
  handleCancelEdit,
  isEditing,
}) => {
  return (
    <div className="flex flex-col w-full max-w-xl gap-6 p-4 mx-auto border rounded-xl bg-primary/5 md:p-8">
      <h2 className="text-lg text-center md:text-2xl font-outfit-bold">
        {isEditing ? "Edit Kategori" : "Tambah Kategori"}
      </h2>
      <InputField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        label="Kategori"
        placeholder="Masukan kategori"
      />
      <div className="flex items-center gap-4">
        {isEditing && (
          <Button
            id="cancel"
            title="Batal"
            containerClass="w-full bg-red-500 mt-4"
            onClick={handleCancelEdit}
          />
        )}
        <Button
          disabed={isLoading || !category}
          id="submit"
          title={isLoading ? "Loading..." : isEditing ? "Edit" : "Simpan"}
          onClick={handleSubmit}
          containerClass="w-full mt-4"
        />
      </div>
    </div>
  );
};

export default FormAddCategory;
