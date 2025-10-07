
@io.swagger.v3.oas.annotations.tags.Tag(name = "AssignmentTemplateApi",
        description = AssignmentTemplateApi.description)
public interface AssignmentTemplateApi {
    String description = "Templates API";
    String BASE_PATH = "/v1/api/user/assignment-template";

    @PostMapping(BASE_PATH + "/find")
    ApiResponse<ApiPagingData<TemplateDto>> findTemplates(
            @RequestBody
            @Valid FindTemplateRequest request
    );

    @PostMapping(BASE_PATH)
    ApiResponse<List<TemplateFieldDto>> findFieldValues(
            @RequestBody
            @Valid FindFieldsRequest request
    );

    @PostMapping(BASE_PATH + "/validate-2")
    ApiResponse<List<TemplateValidationResult>> validateTemplatesV2(
            @RequestBody
            @Valid CreateAssignmentsRequest request
    );

}
