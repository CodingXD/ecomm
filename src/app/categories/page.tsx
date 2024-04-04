import CategoryList from "./_components/category-list";

export default function Categories() {
  return (
    <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="divide-y-2 bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <h1 className="mb-2 text-center text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Please mark your interests!
          </h1>
          <p className="mb-10 text-center text-base">
            We will keep you notified.
          </p>
          <p className="mb-2 text-base font-medium">My saved interests!</p>
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
