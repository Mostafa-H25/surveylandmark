import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EvaluationSectionProps {
  rating: number;
  contractor: string;
}

const EvaluationSection = ({ rating, contractor }: EvaluationSectionProps) => {
  const ratingCategories = [
    { name: "Quality of Work", score: 4.5, percentage: 90 },
    { name: "Timeliness", score: 4.0, percentage: 80 },
    { name: "Communication", score: 4.2, percentage: 84 },
    { name: "Safety Standards", score: 4.8, percentage: 96 },
    { name: "Cost Effectiveness", score: 3.8, percentage: 76 },
  ];

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-4 ${
          i < Math.floor(score)
            ? "fill-yellow-400 text-yellow-400"
            : i < score
              ? "fill-yellow-200 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5 text-yellow-500" />
            Contractor Evaluation - {contractor}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">
                {rating}
              </div>
              <div className="mb-2 flex justify-center">
                {renderStars(rating)}
              </div>
              <p className="text-sm text-gray-500">Overall Rating</p>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <ThumbsUp className="mx-auto mb-1 size-6 text-green-500" />
                  <p className="text-lg font-semibold">92%</p>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
                <div>
                  <MessageSquare className="mx-auto mb-1 size-6 text-blue-500" />
                  <p className="text-lg font-semibold">24</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
                <div>
                  <Award className="mx-auto mb-1 size-6 text-purple-500" />
                  <p className="text-lg font-semibold">15</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ratingCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(category.score)}</div>
                    <span className="text-sm font-semibold">
                      {category.score}
                    </span>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 py-2 pl-4">
              <p className="text-sm text-gray-600">
                "Excellent work quality and attention to detail. The foundation
                work was completed ahead of schedule."
              </p>
              <p className="mt-1 text-xs text-gray-400">
                - Site Manager, 3 days ago
              </p>
            </div>
            <div className="border-l-4 border-green-500 py-2 pl-4">
              <p className="text-sm text-gray-600">
                "Professional team with great communication throughout the
                project."
              </p>
              <p className="mt-1 text-xs text-gray-400">
                - Project Director, 1 week ago
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationSection;
