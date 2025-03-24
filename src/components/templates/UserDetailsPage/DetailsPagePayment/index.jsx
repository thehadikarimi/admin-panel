import Select from "react-select";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper/modules";

import PaymentCard from "@/components/modules/PaymentCard";

import "swiper/css";
import "swiper/css/free-mode";
import "./DetailsPagePayment.css";

function DetailsPagePayment({ userData, enablePaymentEditing = true }) {
  const { payments } = userData;

  const options = payments.map((payment, index) => ({
    value: index,
    label: payment.year,
  }));

  const [year, setYear] = useState(options[options.length - 1]);

  return (
    <div className="c-container">
      <div className="flex justify-between gap-2">
        <h2 className="title w-1/2 text-ellipsis whitespace-nowrap">
          پرداخت‌ها
        </h2>
        <div className="flex w-1/2 items-center justify-end whitespace-nowrap">
          <Select
            className="text-sm !transition-none *:!border-none *:!bg-white *:!text-black *:!outline-none *:!transition-none lg:text-base dark:*:!bg-dark-500 dark:*:!text-neutral-500"
            classNamePrefix="year-select-options"
            value={year}
            options={options}
            onChange={(e) => setYear(e)}
          />
        </div>
      </div>
      <div className="mt-6">
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode={true}
          modules={[FreeMode]}
        >
          {payments
            .find((payment) => payment.year === year.label)
            .data.map((payment, index) => {
              payment.monthIndex = index + 1;
              return (
                <SwiperSlide key={payment._id} className="!w-fit last:!ml-0">
                  <PaymentCard
                    userId={userData._id}
                    year={year}
                    payment={payment}
                    enablePaymentEditing={enablePaymentEditing}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default DetailsPagePayment;
