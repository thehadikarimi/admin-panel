import Modal from "@/components/modules/Modal";
import SVGIcon from "@/components/elements/SVGIcon";
import UpdateCategoryForm from "@/components/modules/Forms/Category/UpdateCategoryForm";

function UpdateCategoryModal({ state, stateToggle, categoryData }) {
  return (
    <Modal state={state} stateToggle={stateToggle}>
      <div className="flex h-full flex-col">
        <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
          <div className="grow text-sm font-bold lg:text-base">
            ویرایش دسته بندی
          </div>
          <button onClick={() => stateToggle(false)} className="flex">
            <SVGIcon name="close" className="size-6 dark:fill-neutral-500" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <UpdateCategoryForm
            stateToggle={stateToggle}
            categoryData={categoryData}
          />
        </div>
      </div>
    </Modal>
  );
}

export default UpdateCategoryModal;
