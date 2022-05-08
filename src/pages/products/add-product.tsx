import { Col, Row, TreeSelect, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { eCommerceApis } from 'apis';
import { Auth, Card, HeaderBreadcrumb, Layout, requireAuth } from 'components';
import SpecificForm from 'components/SpecificForm';
import { ROUTES } from 'constant';
import { InputCustom } from 'custom';
import { GetServerSideProps } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { ICategory, WithLayout } from 'shared/types';

const itemsHeaderBreadcrumb: Array<{ name: string; path?: string }> = [
   {
      name: 'Dashboard',
      path: ROUTES.HOME,
   },
   {
      name: 'Products',
      path: ROUTES.PRODUCTS,
   },
   {
      name: 'Add product',
   },
];

interface Props {
   categories: ICategory[];
}

const AddProduct: WithLayout = ({ categories }: Props) => {
   const editorRef = useRef<any>();
   const { CKEditor, ClassicEditor } = editorRef.current || {};
   const [editorLoaded, setEditorLoaded] = useState(false);
   const inputImageProductRef = useRef<HTMLInputElement | null>(null);
   const [imageProduct, setImageProduct] = useState<File | null>(null);
   const [imagesLibrary, setImagesLibrary] = useState<UploadFile[]>([]);
   const [category, setCategory] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [price, setPrice] = useState<number>(1000);
   const [specific, setSpecific] = useState<{
      [key: string]: string;
   }>({});

   useEffect(() => {
      //fix window not define when use ckeditor
      editorRef.current = {
         CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
         ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
   }, []);

   return (
      <div className="flex flex-col h-full">
         <HeaderBreadcrumb title="Add product" items={itemsHeaderBreadcrumb} />
         <div className="w-full h-full flex-1">
            <Row gutter={16} className="h-full">
               <Col span={16} className="flex flex-col gap-4">
                  <Card customHeader={<></>}>
                     <div className="w-full flex flex-col gap-4">
                        <InputCustom
                           placeholder="Enter product title"
                           label="Product title"
                           isRequire={true}
                        />
                        <div>
                           <label className="vz-add-product-label">
                              Product Description
                           </label>
                           {editorLoaded && (
                              <CKEditor
                                 editor={ClassicEditor}
                                 data={description}
                                 onChange={(event: any, editor: any) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                 }}
                              />
                           )}
                        </div>
                     </div>
                  </Card>
                  <Card title="Pricing">
                     <p className="text-muted mb-2">Add price to product</p>
                     <InputCustom
                        label="Price"
                        placeholder="Enter price"
                        type="number"
                        value={price}
                        onChange={(e) => {
                           setPrice(+e.target.value);
                        }}
                        isRequire={true}
                     />
                  </Card>
                  <Card title="Product Gallery">
                     <div className="flex flex-col gap-4">
                        <div>
                           <label className="vz-add-product-label">
                              Product Image
                           </label>
                           <span className="text-muted mb-4 block">
                              Add Product main Image.
                           </span>
                           <div
                              className="h-[37.5px] flex items-center "
                              onClick={() => {
                                 inputImageProductRef.current?.click();
                              }}
                           >
                              <div className="flex items-center h-full w-full  border-vz-input-border border border-solid cursor-pointer rounded">
                                 <button className="bg-vz-light h-full px-4 py-2 border-r border-inherit">
                                    Choose file
                                 </button>
                                 <div className="px-4 py-2">
                                    {imageProduct
                                       ? imageProduct.name
                                       : 'No file choose'}
                                 </div>
                                 <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    ref={inputImageProductRef}
                                    onChange={(e) => {
                                       const file = e.target.files?.[0];
                                       if (file) {
                                          setImageProduct(file);
                                       } else {
                                          setImageProduct(null);
                                       }
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="vz-gallery">
                           <label className="vz-add-product-label">
                              Product Gallery
                           </label>
                           <span className="text-muted mb-4 block">
                              Add Product Gallery Images.
                           </span>
                           <div>
                              <Upload.Dragger
                                 className="vz-upload"
                                 accept="image/png, image/jpeg"
                                 fileList={imagesLibrary}
                                 onChange={(info) => {
                                    setImagesLibrary(info.fileList);
                                 }}
                                 listType="picture"
                              >
                                 <div className="flex flex-col items-center justify-center">
                                    <AiOutlineCloudUpload className="w-14 h-14 my-7 text-vz-text-color-body" />
                                    <h5 className="font-medium">
                                       Drop files here or click to upload.
                                    </h5>
                                 </div>
                              </Upload.Dragger>
                           </div>
                        </div>
                     </div>
                  </Card>
                  <SpecificForm
                     onChange={(specific) => {
                        setSpecific(specific);
                     }}
                  />
               </Col>
               <Col span={8} className="flex flex-col gap-4">
                  <Card title="Product Categories">
                     <p className="text-muted mb-2">Select product category</p>
                     <TreeSelect
                        className="w-full vz-select"
                        treeData={categories}
                        treeCheckable={true}
                        showCheckedStrategy={TreeSelect.SHOW_PARENT}
                        placeholder="Choose categories"
                        dropdownClassName="vz-dropdown"
                        onChange={(values) => {
                           console.log(values);
                        }}
                     />
                  </Card>
                  <Card title="Product Short Description">
                     <p className="text-muted mb-2">
                        Add short description for product
                     </p>
                     <InputCustom isTextArea={true} />
                  </Card>
               </Col>
            </Row>
            <div>
               <div className="w-[66.66666667%]"></div>
            </div>
         </div>
      </div>
   );
};

AddProduct.getLayout = (page) => {
   return (
      <Auth>
         <Layout>{page}</Layout>
      </Auth>
   );
};

export default AddProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
   const _categories = await (
      await eCommerceApis.getAllCategories('/category')
   ).data.data.categories;

   const treeData = _categories.map((_category) => {
      return {
         title: _category.name,
         value: _category.id,
         key: _category.id,
         children: _category.children
            ? _category.children?.map((_child) => {
                 return {
                    title: _child.name,
                    value: _child.id,
                    key: _child.id,
                 };
              })
            : [],
      };
   });

   console.log(treeData);

   return {
      props: {
         categories: treeData,
      },
   };
});
