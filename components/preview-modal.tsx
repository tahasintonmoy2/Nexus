"use client"

import usePreivewModal from '@/hooks/use-preview-modal'
import React from 'react'
import Modal from '@/components/ui/modal'
import ProductPic from '@/components/product-pic/product-pic'
import Info from '@/components/info'

const PreviewModal = () => {
    const previewModal = usePreivewModal()
    const product = usePreivewModal((state) => state.data)

    if (!product) {
        return null;
    }

  return (
    <Modal
      isOpen={previewModal.isOpen}
      onClose={previewModal.onClose}
    >
      <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
        <div className='sm:col-span-4 lg:col-span-5'>
          <ProductPic images={product.images}/>
        </div>
        <div className='sm:col-span-8 lg:col-span-7'>
            <Info data={product}/>
        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal