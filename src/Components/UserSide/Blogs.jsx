import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import health from "../../images/healthy.jpg"
import avatar from "../../images/avatar.jpeg"
 
export default function Example() {
  return (
  <div className="mt-4">
    <h1 className="text-start ml-12 mt-4 text-4xl text-bold font-serif">Blogs</h1>
  <div className="flex w-full mt-4">
    <div  >
    <Card
      shadow={false}
      className="relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center rounded-lg my-3 ms-14"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none  bg-cover bg-center"
        style={{backgroundImage: `url(${health})`}}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          How to to take care with health?
        </Typography>
        <Typography variant="h5" className="mb-4 text-white">
         Dr.Preful 
        </Typography>
        <div className="h-[6rem] w-[6rem] place-content-center ml-32">
        <Avatar
          size="lg"
          src={avatar}
          variant="circular"
          alt="candice wu"
          className="border-2 border-white rounded-full "
        />
        </div>
      </CardBody>
    </Card>
    </div>
    <div>
    <Card
      shadow={false}
      className="relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center rounded-lg my-3 ms-5"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none  bg-cover bg-center"
        style={{backgroundImage: `url(${health})`}}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          How to to take care with health?
        </Typography>
        <Typography variant="h5" className="mb-4 text-white">
         Dr.Preful 
        </Typography>
        <div className="h-[6rem] w-[6rem] place-content-center ml-32">
        <Avatar
          size="lg"
          src={avatar}
          variant="circular"
          alt="candice wu"
          className="border-2 border-white rounded-full "
        />
        </div>
      </CardBody>
    </Card>
    </div>
    <div>
    <Card
      shadow={false}
      className="relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center rounded-lg my-3 ms-5"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none  bg-cover bg-center"
        style={{backgroundImage: `url(${health})`}}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          How to to take care with health?
        </Typography>
        <Typography variant="h5" className="mb-4 text-white">
         Dr.Preful 
        </Typography>
        <div className="h-[6rem] w-[6rem] place-content-center ml-32">
        <Avatar
          size="lg"
          src={avatar}
          variant="circular"
          alt="candice wu"
          className="border-2 border-white rounded-full "
        />
        </div>
      </CardBody>
    </Card>
    </div>
    </div>
    </div>
  );
}