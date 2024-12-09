import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../ui/button";
import InputField from "../ui/input-field";
import Loader from "../ui/loader";
import SelectField from "../ui/select-field";
import { DataProps } from "../../pages/Article";
import { uploadFiles } from "../../services/uploadService";
import { AppDispatch, RootState } from "../../features/store";
import { fetchCategoriesAsync } from "../../features/categories/categorySlice";

interface Props {
  isEditing?: boolean;
  data: DataProps;
  setData: React.Dispatch<React.SetStateAction<DataProps>>;
  submitHandler: () => void;
  handleCancelBtn: () => void;
  isLoading?: boolean;
}

const FormAddArticle: FC<Props> = ({
  isEditing,
  data,
  setData,
  submitHandler,
  handleCancelBtn,
  isLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);

  const options = categories?.data?.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  const handleChange = async (e: any) => {
    const files = Array.from(e.target.files || []) as File[];

    const handleUpload = async () => {
      setIsLoadingUpload(true);
      try {
        const response = await uploadFiles(files);

        setData({ ...data, cover_image_url: response[0].url });
      } catch (error) {
        toast.error("Gagal upload gambar");
      } finally {
        setIsLoadingUpload(false);
      }
    };

    handleUpload();
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full max-w-xl gap-6 p-4 mx-auto border rounded-xl bg-primary/5 md:p-8">
      <h2 className="text-lg text-center md:text-2xl font-outfit-bold">
        {isEditing ? "Edit Artikel" : "Tambah Artikel"}
      </h2>
      <InputField
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        type="text"
        label="Judul"
        placeholder="Masukan judul"
      />
      <InputField
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        type="textarea"
        label="Deskripsi"
        placeholder="Masukan deskripsi"
      />
      <InputField
        onChange={handleChange}
        type="file"
        label={isEditing ? "Ubah Gambar" : "Upload Gambar"}
        accept="image/*"
      />
      {isLoadingUpload && (
        <div className="flex items-center gap-2">
          <Loader />
          <span className="text-xs font-outfit-regular">Upload gambar...</span>
        </div>
      )}
      {data.cover_image_url && (
        <img
          src={data.cover_image_url}
          alt="cover"
          className="object-cover w-full h-40 rounded-lg"
        />
      )}
      <SelectField
        value={data.category}
        onChange={(e) => setData({ ...data, category: e.target.value })}
        label="Kategori"
        options={options || []}
        placeholder="Pilih kategori"
      />
      <div className="flex items-center gap-4">
        {isEditing && (
          <Button
            id="cancel"
            title="Cancel"
            onClick={handleCancelBtn}
            containerClass="w-full mt-4 bg-red-500"
          />
        )}
        <Button
          disabed={
            !data.title ||
            !data.description ||
            !data.cover_image_url ||
            !data.category ||
            isLoadingUpload ||
            isLoading
          }
          id="submit"
          title={isLoading ? "Loading..." : isEditing ? "Edit" : "Tambah"}
          onClick={submitHandler}
          containerClass="w-full mt-4"
        />
      </div>
    </div>
  );
};

export default FormAddArticle;
