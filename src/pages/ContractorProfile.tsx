import { contractorData } from "@/assets/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, ListTodo, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContractorProfile = () => {
  const [paymentType] = useState("payment");
  const navigate = useNavigate();
  const filteredPaymentData = contractorData.payments.filter(
    (payment) => payment.type === paymentType,
  );
  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-600" />
          </button>
          <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
              <span className="font-medium text-blue-600">
                {contractorData?.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold whitespace-nowrap text-gray-900">
                {contractorData?.name}
              </p>
              <p className="text-lg text-gray-500 capitalize">
                {contractorData?.role.replaceAll("_", " ")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                fill="currentColor"
                fillOpacity={i < contractorData.rate ? 1 : 0}
              />
            ))}
        </div>
      </header>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-blue-600" />
              Personal Data
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">
                {contractorData.name}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">
                {contractorData.email}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">
                {contractorData.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-blue-600" />
              Current Project
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 space-y-4 text-sm lg:grid-cols-2">
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-gray-900">
                  {contractorData.currentProject.title}
                </p>
                <p className="text-gray-900">
                  {contractorData.currentProject.location}
                </p>
                <p className="text-gray-900">
                  {contractorData.currentProject.duration}
                </p>
                <p className="text-gray-900">
                  {contractorData.currentProject.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Responsibilities</p>
              {contractorData.responsibilities.map((responsibility, index) => (
                <p key={responsibility} className="font-semibold text-gray-900">
                  {index + 1}. {responsibility}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="size-5 text-blue-600" />
              BIO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-4">
              {contractorData.bio.map((project) => (
                <div className="space-y-2">
                  <div>
                    <p
                      key={project.company}
                      className="font-semibold text-gray-900"
                    >
                      {project.company}
                    </p>
                    <p className="text-sm text-gray-600">
                      {contractorData.currentProject.location}&nbsp;|&nbsp;
                      {contractorData.currentProject.duration}
                    </p>
                  </div>
                  <p className="text-gray-900">{project.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-4 text-lg">
              <div className="flex items-center gap-2">
                <ListTodo className="size-5 text-blue-600" />
                <p>Payments</p>
              </div>
              <div>
                <Tabs>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="payment">Payments</TabsTrigger>
                    <TabsTrigger value="deduction">Deduction</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  {/* <TableHead>Status</TableHead>
                  <TableHead>Batch Month</TableHead> */}
                  <TableHead>Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentData.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.item}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() => handleViewMember(member.id)}
                        >
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          // onClick={() => handleViewMember(member.id)}
                        >
                          View Document
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ContractorProfile;
