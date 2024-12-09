import {
  MdOutlineCategory,
  MdOutlineEdit,
  MdOutlineDelete,
} from "react-icons/md";
import { Category } from "../../types/category.type";
import { FC } from "react";

interface Props {
  categories: Category[];
  handleDeleteCategory: (documentId: string) => void;
  handleEditCategory: (data: { documentId: string; name: string }) => void;
  documentId?: string;
}

const ListCategory: FC<Props> = ({
  categories,
  handleDeleteCategory,
  handleEditCategory,
  documentId,
}) => {
  return (
    <div>
      <h2 className="text-lg md:text-2xl font-outfit-bold">List Kategori</h2>
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-5">
        {categories?.map((item, i) => (
          <div
            key={i}
            className={`relative w-full gap-4 p-4 overflow-hidden border rounded-xl bg-primary/5 md:p-6 ${
              documentId === item.documentId && "bg-secondary/10"
            }`}
          >
            <p className="text-3xl tracking-widest text-primary font-outfit-bold">
              {item.name}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <MdOutlineEdit
                onClick={() => handleEditCategory(item)}
                size={20}
                className="cursor-pointer text-primary"
              />
              <MdOutlineDelete
                onClick={() => handleDeleteCategory(item.documentId)}
                size={20}
                className="text-red-700 cursor-pointer"
              />
            </div>
            <MdOutlineCategory
              size={120}
              className="absolute -bottom-4 -right-4 -rotate-12 text-primary/10"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCategory;
